
import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { Equipment } from './entities';

export class EquipmentAPI extends RESTDataSource {
    public constructor() {
        super();
        this.baseURL = process.env.WORKOUT_APP_API_URL || 'https://rwherber.com/api/workoutapp/';
    }

    public willSendRequest(request: RequestOptions): void {
        if (this.context && this.context.token) {
            request.headers.set('authorization', this.context.token);
        }
    }

    public async getAllEquipment(): Promise<Equipment[]> {
        const equipment = await this.get<Equipment[]>('equipment');

        return equipment;
    }

    public async getEquipmentById(id: string): Promise<Equipment | null> {
        const equipment = await this.get<Equipment>(`equipment/${id}`);

        if (!equipment) {
            return null;
        }

        return equipment;
    }
}
