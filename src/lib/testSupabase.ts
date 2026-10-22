import { getSupabaseClient } from './supabase';

export async function testSupabaseDatabase() {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('templates')
      .select('id, title')
      .limit(5);

    if (error) {
      console.error('❌ Database query failed:', error.message);

      return {
        success: false,
        message: error.message,
      };
    }

    console.log('✅ Supabase database connection successful!');
    console.log('Templates retrieved:', data);

    return {
      success: true,
      message: 'Database connection successful.',
      templates: data,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error';

    console.error('❌ Supabase test failed:', message);

    return {
      success: false,
      message,
    };
  }
}