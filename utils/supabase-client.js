import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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