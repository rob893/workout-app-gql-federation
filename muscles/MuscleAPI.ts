import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { Muscle } from "./entities";

export class MuscleAPI extends RESTDataSource {
    public constructor() {
        super();
        this.baseURL = process.env.WORKOUT_APP_API_URL || 'https://rwherber.com/api/workoutapp/';
    }

    public willSendRequest(request: RequestOptions): void {
        if (this.context && this.context.token) {
            request.headers.set('authorization', this.context.token);
        }
    }

    public async getMuscles(): Promise<Muscle[]> {
        const muscles = await this.get<Muscle[]>('muscles');

        return muscles;
    }

    public async getMuscleById(id: string): Promise<Muscle | null> {
        const muscle = await this.get<Muscle>(`muscles/${id}`);

        if (!muscle) {
            return null;
        }

        return muscle;
    }
}