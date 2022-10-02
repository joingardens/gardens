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

export async function signInWithGoogle() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google',
  })
}

export async function signInWithKeycloak() {
  const { user, session, error } = await supabase.auth.signIn({
    // @ts-ignore
    provider: 'keycloak',
  })
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

export const getAllSections = async () => {
  const { data, error } = await supabase
    .from('tools')
    .select('section')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};


export const getToolsBySection = async (section_title) => {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('section', section_title)
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

export const getAllActions = async () => {
  const { data, error } = await supabase
    .from('actions')
    .select('id, action, appsrc, isInternal')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getAllActionIds = async () => {
  const { data, error } = await supabase
    .from('actions')
    .select('id, isInternal')

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
    .select('id, tool(id, tool, logo_url, section, category, model), instruction_link')
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

export const getArticleById = async (article_id) => {
  console.log(article_id)
  const { data, error } = await supabase
    .from('drafts')
    .select('*')
    .eq('id', article_id)
    .eq("isPublished", true)

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getFlowsByIds = async (flow_ids) => {
  
  
  const { data, error } = await supabase
    .from('flows')
    .select('*')
    .in('id', flow_ids)

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

export const getFlowItemsByJobToolIds = async (jobtool_ids) => {

  const { data, error } = await supabase
    .from('flow_items')
    .select('flow')
    .in('job_tool', jobtool_ids)

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getAllFlowItemsWithTools = async () => {
  const { data, error } = await supabase
    .from('flow_items')
    .select('id, flow, job_tool(job, tool(id, tool, logo_url))')

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getAllFlows = async () => {
  const { data, error } = await supabase
    .from('flows')
    .select('id, flow, job_group (id, job_group, emoji), created, user_public_profile!author(full_name)')
    .order('created', { ascending: false })

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getPublishedFlows = async () => {
  const { data, error } = await supabase
    .from('flows')
    .select('id, flow, job_group (id, job_group, emoji), created, user_public_profile!author(full_name)')
    .eq("is_private", false)
    .order('created', { ascending: false })

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};


export const getFlowsByAuthor = async (user_id) => {
  const { data, error } = await supabase
    .from('flows')
    .select('id, flow, job_group (id, job_group, emoji), created, user_public_profile!author(full_name)')
    .eq('author', user_id)
    .order('created', { ascending: false })

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getPublishedDrafts = async () => {
  const { data, error } = await supabase
    .from('drafts')
    .select('id, user_public_profile!drafts_user_fkey(id, full_name, avatar_url), draftName, created, isPublished')
    .order('created', { ascending: false })
    .eq('isPublished', true)

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
    .select('id, flow, description, output(id, output, description, job_group), title, image_url')
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
    .select('id, flow, description, input(id, input, description, job_group), title')
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
    .select('id, flow, description, job_tool(id, job(id, job, job_group, description), tool(id, tool, category, model, logo_url, link, one_click), instruction_link, description), image_url')
    .eq('flow', flow_id)
    .order('job_tool');

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getPublishedListings = async () => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('published', true)
    .order('listing')

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

export const getPersonalDetailsByUserId = async (user_id) => {
  const { data, error } = await supabase
    .from('user_public_profile')
    .select('*')
    .eq('id', user_id)

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getActionById = async (action_id) => {
  const { data, error } = await supabase
    .from('actions')
    .select('*')
    .eq('id', action_id)

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getPaasByUserId = async (user_id) => {
  const { data, error } = await supabase
    .from('user_paas')
    .select('*')
    .eq('user', user_id)

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getDropletsByPaasId = async (paas_id) => {
  const { data, error } = await supabase
    .from('user_droplets')
    .select('*')
    .eq('paas_id', paas_id)

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getAppsByUserDropletId = async (user_droplet_id) => {
  const { data, error } = await supabase
    .from('user_apps')
    .select('id, user_droplet_id, tool_id(id, tool, logo_url)')
    .eq('user_droplet_id', user_droplet_id)

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
