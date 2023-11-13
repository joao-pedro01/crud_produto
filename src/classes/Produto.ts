import { Categoria } from "./Categoria";

export class Produto {
    private id: number;
    private id_categoria: number;
    private nome: string;
    private isActive: boolean;
    private createdAt: Date;
    private updatedAt: Date;
    private categoria: Categoria;

    constructor() {
        this.id = 0;
        this.id_categoria = 0;
        this.nome = "";
        this.isActive = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.categoria = new Categoria();
    }

    public getId(): number {
        return this.id;
    }
    public setId(id: number): void {
        this.id = id;
    }

    public getIdCategoria(): number {
        return this.id_categoria;
    }
    public setIdCategoria(id_categoria: number): void {
        this.id_categoria = id_categoria;
    }

    public getNome(): string {
        return this.nome;
    }
    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getIsActive(): boolean {
        return this.isActive;
    }
    public setIsActive(isActive: boolean): void {
        this.isActive = isActive;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }
    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }
    public setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }

    public getCategoria(): Categoria {
        return this.categoria;
    }
    public setCategoria(categoria: Categoria): void {
        this.categoria = categoria;
    }
}