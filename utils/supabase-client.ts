import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export class SupabaseServiceClass {
  readonly supabase: SupabaseClient
  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
}

export const findInputsByString = async (string) => {
  const {data} = await supabase
  .from("inputs")
  .select("*")
  .textSearch("input", string)
  return data
}

export const getAllTools = async () => {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('category');

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getAllJobs = async () => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('job_group');

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getStandalonePostIds = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('id')
    .not('parentId', 'is', null)
    .order('id');

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getAllFlowIds = async () => {
  const { data, error } = await supabase
    .from('flow_items')
    .select('flow')
    .order('flow');

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getJobToolsByTool = async (tool_id) => {
  const { data, error } = await supabase
    .from('jobs_tools')
    .select('*')
    .eq('tool', tool_id)
    .order('job');

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getJobToolsByTask = async (task_id) => {
  const { data, error } = await supabase
    .from('jobs_tools')
    .select('tool(id, tool, logo_url, section, category, model), instruction_link')
    .eq('job', task_id)
    .order('tool');

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getToolById = async (tool_id) => {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('id', tool_id)
    .order('category');

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getTaskById = async (task_id) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', task_id)
    .order('job_group');

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getFlowById = async (flow_id) => {
  const { data, error } = await supabase
    .from('flows')
    .select('*')
    .eq('id', flow_id)

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getPostById = async (post_id) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', post_id)

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getAllJobGroups = async () => {
  const { data, error } = await supabase
    .from('job_groups')
    .select('*')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getAllJobTools = async () => {
  const { data, error } = await supabase
    .from('jobs_tools')
    .select('*')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getAllFlowsOutputs = async () => {
  const { data, error } = await supabase
    .from('flows_outputs')
    .select('*')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getAllFlowItems = async () => {
  const { data, error } = await supabase
    .from('flow_items')
    .select('*')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getAllFlowItemsWithTools = async () => {
  const { data, error } = await supabase
    .from('flow_items')
    .select('id, flow, job_tool(job, tool(id, tool))')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getAllFlows = async () => {
  const { data, error } = await supabase
    .from('flows')
    .select('*')
    .order('created')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getAllOutputs = async () => {
  const { data, error } = await supabase
    .from('outputs')
    .select('*')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getOutputById = async (output_id) => {
  const { data, error } = await supabase
    .from('outputs')
    .select('*')
    .eq('id', output_id)

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getFlowOutputsByFlowId = async (flow_id) => {
  const { data, error } = await supabase
    .from('flows_outputs')
    .select('id, flow, output(id, output, description, job_group), title')
    .eq('flow', flow_id)
    .order('id')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getFlowOutputsByOutputId = async (output_id) => {
  const { data, error } = await supabase
    .from('flows_outputs')
    .select('id, flow, output, title')
    .eq('output', output_id)
    .order('id')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getFlowInputsByFlowId = async (flow_id) => {
  const { data, error } = await supabase
    .from('flows_inputs')
    .select('id, flow, input(id, input, description, job_group), title')
    .eq('flow', flow_id)
    .order('id')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getFlowItemsById = async (flow_id) => {
  const { data, error } = await supabase
    .from('flow_items')
    .select('*')
    .eq('id', flow_id)
    .order('job_tool');

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getFlowItemsByFlowId = async (flow_id) => {
  const { data, error } = await supabase
    .from('flow_items')
    .select('id, flow, job_tool(id, job(id, job, job_group, description), tool(id, tool, category, model, logo_url), instruction_link, description)')
    .eq('flow', flow_id)
    .order('job_tool');

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getAllValues = async () => {
  const { data, error } = await supabase
    .from('values')
    .select('*')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getActiveProductsWithPrices = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const searchForTools = async (query) => {
  const { data, error } = await supabase
    .from('tools')
    .select('id, tool, category, description, link, model, logo_url')
    .or('tool.fts.' + query + ',description.fts.' + query + ',category.fts.' + query)
    .order('category')
    .order('model');
    //.textSearch('description || tool || category', query, { 
    //config: 'english' 
    //})

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const searchForJobs = async (query) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('id, job, job_group(job_group, emoji), description')
    .or('job.fts.' + query + ',description.fts.' + query)
    .order('job_group')
    .order('job');
    //.textSearch('description || tool || category', query, { 
    //config: 'english' 
    //})

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const updateUserName = async (user, name) => {
  await supabase
    .from('users')
    .update({
      full_name: name
    })
    .eq('id', user.id);
};

/* Uncomment when Supabase ships access to non-public schemas
export const listTables = async () => {
  const { data, error } = await supabase
  .from('information_schema')
  .select('*')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
}
*/
/* Uncomment when listening to real-time updates is needed
export const mySubscription = async () => {
  const { data, error } = await supabase
  .from('Tools')
  .on('*', payload => {
    console.log('Change received!', payload)
  })
  .subscribe()

  if (error){
    console.log(error.message);
    throw error;
  }

  return data || [];
} 
*/