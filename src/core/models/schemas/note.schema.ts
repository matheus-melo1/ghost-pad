import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JsonValueSchema: z.ZodType<any> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(JsonValueSchema),
    z.record(JsonValueSchema),
  ]),
);

const NoteSchema = z.object({
  id: z.string(),
  name: z.string(),
  text: JsonValueSchema,
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isPublic: z.boolean(),
  sharedWith: JsonValueSchema.nullable(),
  archived: z.boolean(),
  userId: z.string(),
});

const NotesSchema = z.array(NoteSchema);

type NoteType = z.infer<typeof NoteSchema>;
type NotesType = z.infer<typeof NotesSchema>;

export { NoteSchema, NotesSchema, JsonValueSchema };
export type { NoteType, NotesType };
