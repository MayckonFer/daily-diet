import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      created_at: string;
      updated_at: string;
      session_id?: string;
    };
    session: {
      session_id: string;
      user_id: string;
    };
    meals: {
      id: string;
      user_id: string;
      name: string;
      description: string;
      isDiet: boolean;
      created_at: string;
      updated_at: string;
      session_id?: string;
    };
  }
}
