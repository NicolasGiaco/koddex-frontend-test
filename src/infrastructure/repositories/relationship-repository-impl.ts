import type { CsvRow } from "../../domain/entities/csv-data"
import type { Relationship } from "../../domain/entities/relationship"
import { Relationship as RelationshipEntity, RelationshipType } from "../../domain/entities/relationship"
import type { RelationshipRepository } from "../../domain/repositories/relationship-repository"
import { CsvFileRepository } from "./csv-file.repository"

export class RelationshipRepositoryImpl implements RelationshipRepository {
  constructor(
    private readonly csvRepository = new CsvFileRepository(),
    private readonly fileName = "relationships.csv",
  ) {}

  async findAll(): Promise<Relationship[]> {
    try {
      const csvData = await this.csvRepository.readCsvFile(this.fileName)
      return csvData.map(row => this.mapCsvRowToRelationship(row))
    } catch {
      // If relationships file doesn't exist, return empty array
      return []
    }
  }

  async findByChild(childId: string): Promise<Relationship[]> {
    const allRelationships = await this.findAll()
    return allRelationships.filter(rel => {
      const child = rel.getChildId()

      return child === childId
    })
  }

  private mapCsvRowToRelationship(row: CsvRow): Relationship {
    const parentId = row.parent_id || row.parentId || ""
    const childId = row.child_id || row.childId || ""
    const type = this.parseRelationshipType(row.type || row.relationship_type)

    return new RelationshipEntity(parentId, childId, type)
  }

  private parseRelationshipType(typeString: string): RelationshipType {
    switch (typeString?.toLowerCase()) {
      case "parent_child":
      case "parent-child":
        return RelationshipType.PARENT_CHILD
      case "dependency":
        return RelationshipType.DEPENDENCY
      case "related":
        return RelationshipType.RELATED
      default:
        return RelationshipType.PARENT_CHILD
    }
  }
}
