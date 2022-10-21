export interface DeleteContactUseCase {
    execute(id: string): Promise<void>
}
