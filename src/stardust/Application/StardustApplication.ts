import { StardustApplicationData } from './Types';

export default class StardustApplication {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public description: string | null = null,
    public apiKey: string | null = null,
    public createdAt: number | null = null,
    public lastUpdated: number | null = null,
    public rootUserId: string | null = null,
    public identityId: string | null = null
  ) {}

  public static generate(applicationData: StardustApplicationData): StardustApplication {
    return new StardustApplication(
      applicationData.id,
      applicationData.name,
      applicationData.email,
      applicationData.description,
      applicationData.apiKey,
      applicationData.createdAt,
      applicationData.lastUpdated,
      applicationData.rootUserId,
      applicationData.identityId
    );
  }
}
