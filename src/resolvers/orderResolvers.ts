import axios from 'axios';

const orderResolvers = {
  Query: {
    getOrderItems: async () => {
      const response = await axios.get('http://order-service:5051/api/OrderItems');
      return response.data;
    },
    getOrderItem: async (_: any, { id }: { id: string }) => {
      const response = await axios.get(`http://order-service:5051/api/OrderItems/${id}`);
      return response.data;
    },
    getOrders: async () => {
      const response = await axios.get('http://order-service:5051/api/Orders');
      return response.data;
    },
    getOrder: async (_: any, { id }: { id: string }) => {
      const response = await axios.get(`http://order-service:5051/api/Orders/${id}`);
      return response.data;
    },
    getTableDatas: async () => {
      const response = await axios.get('http://order-service:5051/api/TableDatas');
      return response.data;
    },
    getTableData: async (_: any, { id }: { id: number }) => {
      const response = await axios.get(`http://order-service:5051/api/TableDatas/${id}`);
      return response.data;
    },
  },
  Mutation: {
    createOrderItem: async (_: any, { orderItem }: { orderItem: any }) => {
      const response = await axios.post('http://order-service:5051/api/OrderItems', orderItem);
      return response.data;
    },
    updateOrderItem: async (_: any, { id, orderItem }: { id: string, orderItem: any }) => {
      const response = await axios.put(`http://order-service:5051/api/OrderItems/${id}`, orderItem);
      return response.data;
    },
    deleteOrderItem: async (_: any, { id }: { id: string }) => {
      await axios.delete(`http://order-service:5051/api/OrderItems/${id}`);
      return { success: true };
    },
    createOrder: async (_: any, { order }: { order: any }) => {
      const response = await axios.post('http://order-service:5051/api/Orders', order);
      return response.data;
    },
    updateOrder: async (_: any, { id, order }: { id: string, order: any }) => {
      const response = await axios.put(`http://order-service:5051/api/Orders/${id}`, order);
      return response.data;
    },
    deleteOrder: async (_: any, { id }: { id: string }) => {
      await axios.delete(`http://order-service:5051/api/Orders/${id}`);
      return { success: true };
    },
    createTableData: async (_: any, { tableData }: { tableData: any }) => {
      const response = await axios.post('http://order-service:5051/api/TableDatas', tableData);
      return response.data;
    },
    updateTableData: async (_: any, { id, tableData }: { id: string, tableData: any }) => {
      const response = await axios.put(`http://order-service:5051/api/TableDatas/${id}`, tableData);
      return response.data;
    },
    deleteTableData: async (_: any, { id }: { id: string }) => {
      await axios.delete(`http://order-service:5051/api/TableDatas/${id}`);
      return { success: true };
    },
  },
};

export { orderResolvers };
