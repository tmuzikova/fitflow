//import { createClient, SupabaseClient } from "@supabase/supabase-js";

import { SectionWrapper } from "../hoc";

/*interface Exercise {
  id: number;
  name: string;
  img: string | null;
  equipment: string;
  description: string;
  compound_exercise: boolean;
  isolated_exercise: boolean;
  body_part: string;
  muscle_targetted: string;
}

const supabaseUrl: string = "https://thvfesvykdcsdncxdbsq.supabase.co";
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);*/

const Generator: React.FC = () => {
  return <p className="text-white">Tbd</p>;
};

export default SectionWrapper(Generator, "generator");
