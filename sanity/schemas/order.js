// schemas/pet.js
export default {
  name: 'order',
  type: 'document',
  title: 'order',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      options: {
        maxLength: 40,
      },
    },
    {
      name: 'id',
      title: 'Order_id',
      type: 'string',
    },
    {
      name: 'number',
      title: 'Number',
      type: 'string',
      options: {
        maxLength: 14,
      },
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      options: {
        maxLength: 100,
      },
    },
    {
      name: 'method',
      title: 'Method',
      type: 'number',
    },
    {
      name: 'total',
      title: 'Total',
      type: 'number',
    },

    {
      name: 'descriptions',
      title: 'Descriptions',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'number',
    },
  ],
}
