import { IconType } from 'react-icons';

export class Skill {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly icon: IconType,
    public readonly category: string,
    public readonly level: number,
    public readonly color: string
  ) {}

  // Métodos de dominio
  public isAdvanced(): boolean {
    return this.level >= 80;
  }

  public getExperienceLevel(): 'Básico' | 'Intermedio' | 'Avanzado' {
    if (this.level >= 80) return 'Avanzado';
    if (this.level >= 50) return 'Intermedio';
    return 'Básico';
  }
} 