/**
 * Initialize on instance of Task
 * @param {string} id
 * @param {string} name
 * @param {boolean} isCompleted
 * @constructor
 */
export class Task {
  constructor(id, name, isCompleted = false, isEditing = false) {
    this.id = id;
    this.name = name;
    this.isCompleted = isCompleted;
    this.isEditing = isEditing;
  }
}