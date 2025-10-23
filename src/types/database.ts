export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string;
          titulo: string;
          descripcion: string;
          estado: 'pendiente' | 'completada';
          created_at: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          titulo: string;
          descripcion?: string;
          estado?: 'pendiente' | 'completada';
          created_at?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          titulo?: string;
          descripcion?: string;
          estado?: 'pendiente' | 'completada';
          created_at?: string;
          user_id?: string;
        };
      };
    };
  };
};

export type Task = Database['public']['Tables']['tasks']['Row'];
