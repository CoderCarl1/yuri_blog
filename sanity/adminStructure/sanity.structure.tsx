import { StructureBuilder} from "sanity/structure";

/**
 * Site Settings and its children
 */

const settingsChildren = [
  { title: 'Metadata', id: 'siteSettings' },
  { title: 'Site Colors', id: 'colors' },
  { title: 'Main Navigation', id: 'navigation' },
]

function SiteSettings(S: StructureBuilder) {
  return S.listItem()
    .title('Site Settings')
    .child(
      S.list()
        .title('Settings Documents')
        .items(
          settingsChildren.map(({ id, title }) =>
            S.listItem()
              .title(title)
              .child(S.document().schemaType(id).documentId(id)
              )
          )
        )
    )
}

// Pages

function HomePage(S: StructureBuilder) {
  return S.listItem()
          .title('Home Page')
          .child(
            S.editor()
            .id('homepage')
            .schemaType('homepage')
            .documentId('homePage')
          )
}



function Posts_All(S: StructureBuilder){
  return S.listItem()
  .title('Posts')
  .child(
    S.documentList()
      .title('All Posts')
      .filter('_type == "post"')
  )
}

const filters = [
  {title: 'Authors', id: 'author', plural: 'author'},
  {title: 'Categories', id: 'category', plural: 'categories'},
  // {title: 'Languages', id: 'languages', plural: 'languages'},
]

function Posts_ByCategories(S: StructureBuilder){
  return S.listItem()
  .title('Posts By Category')
  .child(
    S.list()
    .title('Filters')
    .items(filters.map(filter => S.listItem().title(filter.title).child(
      S.documentTypeList(filter.id)
      .title(filter.title)
      .child( documentId =>
        S.documentList()
        .title('Posts')
        .filter(`_type == "post" && ${documentId} in ${filter.plural}[]._ref`)
      )
    )))
  )
}

/**
 * GENERAL
 */

const documentsToExclude = [ 'post', 'siteSettings', 'colors', 'navigation', /** 'translation.metadata',*/ 'homepage' ];


function otherCategories(S: StructureBuilder) {
  return S.documentTypeListItems()
    .filter(listItem =>
      !documentsToExclude.includes(listItem.getId() ?? '')
    )
}

// const documentsToInclude = ['post', 'language']


export default function main(S: StructureBuilder) {
  const a = S.list()
    .title('Blog')
    .items([
      HomePage(S),
      S.divider(),
      Posts_All(S),
      Posts_ByCategories(S),
      S.divider(),
      ...otherCategories(S),
      S.divider(),
      SiteSettings(S),
    ])
    console.log("S", a)

    return a;
}


// const Structures = {
//   main
// }


// export default Structures;