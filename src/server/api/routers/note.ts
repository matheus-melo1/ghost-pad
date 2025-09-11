import {
  NoteSchema,
  NotesSchema,
  type NoteType,
} from "@/core/models/schemas/note.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import z from "zod";

export const noteRouter = createTRPCRouter({
  createNoteEmpty: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.userId;

    const action = ctx.db.note.create({
      data: {
        name: "empty",
        title: "Empty",
        text: {},
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

    return notes;
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
