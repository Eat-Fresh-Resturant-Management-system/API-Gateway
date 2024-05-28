import { RESTDataSource } from 'apollo-datasource-rest';

class TableBookingAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://eatfresh.tableBookingService:4000/';
  }

  async getTableBookings() {
    return this.get('table-bookings');
  }

  async getTables() {
    return this.get('tables');
  }

  async getAvailableTables() {
    return this.get('tables/available');
  }

  async getTableBookingByUserName(userName: string) {
    return this.get(`table-bookings/${userName}`);
  }

  async createTableBooking(data: any) {
    return this.post('table-bookings', data);
  }

  async createTable(data: any) {
    return this.post('tables', data);
  }

  async toggleTableAvailability(tableName: string) {
    return this.put(`tables/${tableName}/toggle-availability`);
  }

  async deleteTableBookingByUserName(userName: string) {
    return this.delete(`table-bookings/${userName}`);
  }

  async deleteTable(tableName: string) {
    return this.delete(`tables/${tableName}`);
  }
}

export default TableBookingAPI;
