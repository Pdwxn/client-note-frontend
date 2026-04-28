export type NoteType = 'call' | 'meeting' | 'idea' | 'contract';

export interface Note {
  id: number;
  user: number;
  client: number;
  title: string;
  content: string;
  type: NoteType;
  created_at: string;
}

export type NoteCreate = Omit<Note, 'id' | 'user' | 'created_at'>;
export type NoteUpdate = Partial<Omit<Note, 'id' | 'user' | 'created_at'>>;