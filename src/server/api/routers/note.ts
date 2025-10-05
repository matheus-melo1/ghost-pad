import {
  NoteSchema,
  NotesSchema,
  type NoteType,
} from "@/core/models/schemas/note.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import z from "zod";
import { sortBy } from "lodash";

export const noteRouter = createTRPCRouter({
  createNoteEmpty: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.userId;

    const action = ctx.db.note.create({
      data: {
        name: "empty",
        title: "Nota vazia",
        text: {
          type: "paragraph",
          attrs: { textAlign: null },
          content: [{ text: "Texto Vazio", type: "text" }],
        },
        userId,
        isPublic: false,
        archived: false,
      },
      select: {
        id: true,
      },
    });

    return action;
  }),

  getNotes: protectedProcedure.output(NotesSchema).query(async ({ ctx }) => {
    const notes = await ctx.db.note.findMany({
      where: {
        userId: ctx.session.userId,
      },
    });

    return sortBy(notes, (note) => note.createdAt);
  }),

  archiveNoteById: protectedProcedure
    .input(z.object({ id: z.string(), isArchived: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.db.note.update({
        where: {
          id: input.id,
        },
        data: {
          archived: input.isArchived,
        },
      });

      return note;
    }),

  getNoteById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .output(NoteSchema)
    .query(async ({ ctx, input }) => {
      const note = await ctx.db.note.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!note) throw new Error("Note not found");

      return note as NoteType;
    }),

  changeTitleNote: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.db.note.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      });

      return note;
    }),

  changeContentNote: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.db.note.update({
        where: {
          id: input.id,
        },
        data: {
          text: JSON.parse(input.content),
        },
      });

      return note;
    }),

  deleteNoteById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.db.note.delete({
        where: {
          id: input.id,
        },
      });

      return note;
    }),
});
