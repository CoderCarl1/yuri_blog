import { StructureBuilder, StructureResolverContext } from 'sanity/structure';
import SiteSettings from '../components/siteSettings';
import { SchemaType } from 'sanity';
import { sanityStructure } from '@/types/siteSettings.type';
import { FaCog } from "react-icons/fa";

/**
 * Site Settings and its children
 */

function SiteSettingsStructure(S: StructureBuilder) {
  const socialMediaFields: sanityStructure[] = S.context.schema._registry.schema_social_media.get().fields;
  const siteSettingsStructure: sanityStructure[] = S.context.schema._registry.site_settings.get().fields;
  const SocialMediaReference = siteSettingsStructure.find(struct => struct.name === "social_media");
  if (SocialMediaReference && socialMediaFields.length){
    SocialMediaReference.type.fields = socialMediaFields;
    SocialMediaReference.type.title = "Social Media"
  }

  console.log("S.context.schema._registry.site_settings.get()", S.context.schema._registry.site_settings.get())

  return S.listItem()
    .title('Site Settings')
    .icon(FaCog)
    .child(
      S.component()
        .component(() => (
          <SiteSettings sanityStructure={siteSettingsStructure}/>
        ))
        .title('Site Settings'),
    );

    /**
     * for the default view
     */
    // return S.listItem()
    // .title('Site Settings')
    // .icon(FaCog)
    // .child(
    //   S.editor().schemaType('siteSettings').documentId('site_settings'),
    // );
}

// Pages

function HomePage(S: StructureBuilder) {
  return S.listItem()
    .title('Home Page')
    .child(
      S.editor().id('homepage').schemaType('homepage').documentId('homePage'),
    );
}

function Posts_All(S: StructureBuilder) {
  return S.listItem()
    .title('Posts')
    .child(S.documentList().title('All Posts').filter('_type == "post"'));
}

const filters = [
  { title: 'Authors', id: 'author', plural: 'author' },
  { title: 'Categories', id: 'category', plural: 'categories' },
  // {title: 'Languages', id: 'languages', plural: 'languages'},
];

function Posts_ByCategories(S: StructureBuilder) {
  return S.listItem()
    .title('Posts By Category')
    .child(
      S.list()
        .title('Filters')
        .items(
          filters.map((filter) =>
            S.listItem()
              .title(filter.title)
              .child(
                S.documentTypeList(filter.id)
                  .title(filter.title)
                  .child((documentId) =>
                    S.documentList()
                      .title('Posts')
                      .filter(
                        `_type == "post" && ${documentId} in ${filter.plural}[]._ref`,
                      ),
                  ),
              ),
          ),
        ),
    );
}

/**
 * GENERAL
 */

const documentsToExclude = [
  'post',
  'site_settings',
  /** 'translation.metadata',*/ 'media.tag',
  'homepage',
  'schema_social_media'
];

function otherCategories(S: StructureBuilder) {
  return S.documentTypeListItems().filter(
    (listItem) => !documentsToExclude.includes(listItem.getId() ?? ''),
  );
}

export default function main(S: StructureBuilder, context: StructureResolverContext) {
  return S.list()
    .title('Blog')
    .items([
      HomePage(S),
      S.divider(),
      Posts_All(S),
      Posts_ByCategories(S),
      S.divider(),
      ...otherCategories(S),
      S.divider(),
      SiteSettingsStructure(S),
    ]);
}
