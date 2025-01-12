import { CompanyType } from '../constants/experiences';

export class Experience {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly company: string,
    public readonly type: CompanyType,
    public readonly location: string,
    public readonly link: string,
    public readonly startDate: string,
    public readonly endDate: string | undefined,
    public readonly duration: string,
    public readonly logo: string,
    public readonly description: string[],
    public readonly skills: string[]
  ) {}

  public isCurrentJob(): boolean {
    return !this.endDate || this.endDate === 'Presente';
  }

  public getYearsOfExperience(): number {
    const start = new Date(this.startDate);
    const end = this.endDate ? new Date(this.endDate) : new Date();
    return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365));
  }
} 