import { z } from "zod";

const descricao = z
  .string({ error: "descricao é obrigatória e deve ser um texto." })
  .trim()
  .min(1, "descricao não pode ser vazia.");

const concluida = z.boolean({ error: "concluida deve ser verdadeiro ou falso." });

export const objectIdParams = z.object({
  objectId: z.uuid({ error: "objectId deve ser um UUID válido." }),
});

export const criarTarefaBody = z.object({
  descricao,
  concluida: concluida.optional(),
});

export const atualizarTarefaBody = z
  .object({
    descricao: descricao.optional(),
    concluida: concluida.optional(),
  })
  .refine((data) => data.descricao !== undefined || data.concluida !== undefined, {
    error: "Informe descricao e/ou concluida para atualizar.",
  });
