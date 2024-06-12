import axios from 'axios';

// Define the resolvers
const menuResolvers = {
  Query: {
    menuItems: async () => {
      const response = await axios.get('http://menu-service:80/api/MenuItems');
      return response.data;
    },
    menuItem: async (_: any, { id }: { id: number }) => {
      const response = await axios.get(`http://menu-service:80/api/MenuItems/${id}`);
      return response.data;
    },
    menuCategories: async () => {
      const response = await axios.get('http://menu-service:80/api/MenuCategories');
      return response.data;
    },
    menuCategoryByName: async (_: any, { name }: { name: string }) => {
      const response = await axios.get(`http://menu-service:80/api/MenuCategories/${name}`);
      return response.data;
    },
    menuItemsForCategory: async (_: any, { categoryId }: { categoryId: string }) => {
      const response = await axios.get(`http://menu-service:80/api/MenuCategories/${categoryId}/MenuItems`);
      return response.data;
    },
  },
  Mutation: {
    createMenuCategory: async (_: any, { menuCategory }: { menuCategory: any }) => {
      const response = await axios.post('http://menu-service:80/api/MenuCategories', menuCategory);
      return response.data;
    },
    deleteMenuCategory: async (_: any, { name }: { name: string }) => {
      await axios.delete(`http://menu-service:80/api/MenuCategories/${name}`);
      return { success: true };
    },
    createMenuItem: async (_: any, { menuItem }: { menuItem: any }) => {
      const response = await axios.post('http://menu-service:80/api/MenuItems', menuItem);
      return response.data;
    },
    deleteMenuItem: async (_: any, { id }: { id: number }) => {
      await axios.delete(`http://menu-service:80/api/MenuItems/${id}`);
      return { success: true };
    },
  },
  MenuCategory: {
    MenuItems: async (parent: { MenuCategoryName: string }) => {
      const response = await axios.get(`http://menu-service:80/api/MenuCategories/${parent.MenuCategoryName}/MenuItems`);
      return response.data;
    },
  },
  MenuItem: {
    __resolveReference: async (reference: { ItemId: number }) => {
      const response = await axios.get(`http://menu-service:80/api/MenuItems/${reference.ItemId}`);
      return response.data;
    },
  },
};

export { menuResolvers };
