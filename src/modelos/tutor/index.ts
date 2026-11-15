import * as SQLite from "expo-sqlite";

export interface TutorDTO {
  nome: string;
  cidade: string;
  documento: string;
  fotoTutor?: string;
}

let dbInstance: SQLite.SQLiteDatabase | null = null;

async function getDatabase() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("localDatabase");
  }

  await dbInstance.execAsync(
    `PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS tutor (id INTEGER PRIMARY KEY NOT NULL, nome TEXT NOT NULL, cidade TEXT NOT NULL, documento TEXT NOT NULL, fotoTutor TEXT);`,
  );

  return dbInstance;
}

export class TutorService {
  async cadastrar(dados: TutorDTO) {
    const db = await getDatabase();
    if (!dados.nome?.trim()) {
      return { sucesso: false, erro: "O campo nome é obrigatório." };
    }

    if (!dados.documento?.trim()) {
      return { sucesso: false, erro: "O campo documento é obrigatório." };
    }

    if (!dados.cidade?.trim()) {
      return { sucesso: false, erro: "O campo cidade é obrigatório." };
    }

    const preparedInsert = await db.prepareAsync(
      `INSERT INTO tutor (nome, cidade, documento, fotoTutor) VALUES ($nome, $cidade, $documento, $fotoTutor)`,
    );
    try {
      const result = await preparedInsert.executeAsync({
        $nome: dados.nome,
        $cidade: dados.cidade,
        $documento: dados.documento,
        $fotoTutor: dados.fotoTutor ?? null,
      });
      console.log(JSON.stringify(result));
    } catch {
      return { sucesso: false, erro: "Ocorreu um problema ao cadastrar seus dados." };
    } finally {
      await preparedInsert.finalizeAsync();
    }

    return { sucesso: true, mensagem: "Tutor cadastrado com sucesso!" };
  }

  async consultaTutor() {
    const db = await getDatabase();
    const preparedSelect = await db.prepareAsync(`SELECT * FROM tutor LIMIT 1`);
    try {
      const result = await preparedSelect.executeAsync();
      const firstRow = await result.getFirstAsync();

      return { sucesso: true, data: firstRow };
    } catch {
      return {
        sucesso: false,
        erro: "Falha ao consultar seus dados. <br> Tente novamente ou refaça seu cadastro.",
      };
    } finally {
      await preparedSelect.finalizeAsync();
    }
  }
}
