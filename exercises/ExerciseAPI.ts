import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { Exercise } from "./entities";

export class ExerciseAPI extends RESTDataSource {
    public constructor() {
        super();
        this.baseURL = process.env.WORKOUT_APP_API_URL || 'https://rwherber.com/api/workoutapp/';
    }

    public willSendRequest(request: RequestOptions): void {
        if (this.context && this.context.token) {
            request.headers.set('authorization', this.context.token);
        }
    }

    public async getExercises(): Promise<Exercise[]> {
        const exercises = await this.get<Exercise[]>('exercises/detailed');

        return exercises;
    }

    public async getExerciseById(id: string): Promise<Exercise | null> {
        const exercise = await this.get<Exercise>(`exercises/${id}/detailed`);

        if (!exercise) {
            return null;
        }

        return exercise;
    }
}