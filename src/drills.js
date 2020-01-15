require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

// Get all items that contain text
function searchByItemName(searchTerm) {
    knexInstance
      .select('*')
      .from('shopping_list')
      .where('name', 'ILIKE', `%${searchTerm}%`)
      .then(result => {
        console.log(result)
    })
}
searchByItemName('pizza')


// Get all items paginated
function paginateItems(pageNumber) {
    const productsPerPage = 6
    const offset = productsPerPage * (pageNumber - 1)
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
        console.log(result)
    })
}
paginateItems(3)


// Get all items added after date
function itemsAfterDate(daysAgo) {
    knexInstance
      .select('*')
      .from('shopping_list')
      .where(
        'date_added',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
      )
      .then(result => {
        console.log(result)
      })
}
itemsAfterDate(15)


// Get the total cost for each category
function totalCategoryCosts() {
    knexInstance
        .select('category')
        .from('shopping_list')
        .groupBy('category')
        .sum('price AS total')
        .then(result => {
            console.log(result)
        })
}
totalCategoryCosts()