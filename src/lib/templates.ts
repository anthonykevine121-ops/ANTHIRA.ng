
import { getSupabaseClient } from './supabase';
import type { Template } from '../types';
import { TEMPLATE_FALLBACK_IMAGES, TEMPLATES } from '../data/mockData';

interface SupabaseTemplate {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  price_usd: number | string;
  price_ngn: number | string;
  preview_image: string | null;
  is_active: boolean;
}

const supportedCategories: Template['category'][] = [
  'Business',
  'E-commerce',
  'Restaurant',
  'Fashion',
  'Portfolio',
  'React',
];

// Convert database categories into supported application categories.
function normalizeCategory(
  category: string | null
): Template['category'] {
  const normalized = category?.trim().toLowerCase();

  const matchedCategory = supportedCategories.find(
    (item) => item.toLowerCase() === normalized
  );

  if (matchedCategory) {
    return matchedCategory;
  }

  if (
    normalized?.includes('hotel') ||
    normalized?.includes('hospitality')
  ) {
    return 'Business';
  }

  if (
    normalized?.includes('shop') ||
    normalized?.includes('commerce') ||
    normalized?.includes('store')
  ) {
    return 'E-commerce';
  }

  if (
    normalized?.includes('food') ||
    normalized?.includes('dining')
  ) {
    return 'Restaurant';
  }

  if (normalized?.includes('fashion')) {
    return 'Fashion';
  }

  if (normalized?.includes('portfolio')) {
    return 'Portfolio';
  }

  if (normalized?.includes('react')) {
    return 'React';
  }

  return 'Business';
}

// Safely convert database prices into numbers.
function normalizePrice(
  price: number | string | null | undefined
): number {
  const value = Number(price);

  return Number.isFinite(value) && value >= 0 ? value : 0;
}

// Convert a Supabase database record into your Template type.
function mapDatabaseTemplate(
  row: SupabaseTemplate
): Template {
  const category = normalizeCategory(row.category);

  const existingTemplate = TEMPLATES.find(
    (template) =>
      template.title.trim().toLowerCase() ===
      row.title.trim().toLowerCase()
  );

  const previewImage = row.preview_image?.trim();
  const image =
    (previewImage && !previewImage.startsWith('/src/assets/') ? previewImage : null) ||
    existingTemplate?.image ||
    TEMPLATE_FALLBACK_IMAGES[category] ||
    TEMPLATE_FALLBACK_IMAGES.Business;

  const priceUSD = normalizePrice(row.price_usd);
  const priceNGN = normalizePrice(row.price_ngn);

  return {
    id: row.id,
    title: row.title,

    subtitle:
      existingTemplate?.subtitle ||
      `${category} website template`,

    // Prices are taken from Supabase.
    priceUSD,
    priceNGN,

    badge: existingTemplate?.badge,
    rating: existingTemplate?.rating ?? 5,
    reviewCount: existingTemplate?.reviewCount ?? 0,

    description: row.description || '',

    category,
    image,

    galleryImages:
      existingTemplate?.galleryImages ?? [image],

    features:
      existingTemplate?.features ?? [],

    technologies:
      existingTemplate?.technologies ?? [
        'HTML',
        'CSS',
        'JavaScript',
      ],

    demoUrl: existingTemplate?.demoUrl,

    downloadsCount:
      existingTemplate?.downloadsCount ?? 0,

    tags:
      existingTemplate?.tags ?? [
        category,
        'Website Template',
      ],
  };
}

// Fetch active templates from Supabase.
export async function fetchTemplates(): Promise<Template[]> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('templates')
      .select(
        'id, title, description, category, price_usd, price_ngn, preview_image, is_active'
      )
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(
        'Supabase templates error:',
        error.message
      );

      throw new Error(
        `Could not load templates: ${error.message}`
      );
    }

    const databaseTemplates = (
      (data ?? []) as SupabaseTemplate[]
    ).map(mapDatabaseTemplate);

    console.log(
      `Loaded ${databaseTemplates.length} templates from Supabase.`
    );

    // Add mock templates only when they do not already
    // exist in Supabase.
    const databaseTitles = new Set(
      databaseTemplates.map((template) =>
        template.title.trim().toLowerCase()
      )
    );

    const additionalMockTemplates = TEMPLATES.filter(
      (template) =>
        !databaseTitles.has(
          template.title.trim().toLowerCase()
        )
    );

    return [
      ...databaseTemplates,
      ...additionalMockTemplates,
    ];
  } catch (error) {
    console.error(
      'Failed to fetch website templates:',
      error
    );

    throw error;
  }
}