import React from "react";
import styles from "@/assets/styles/main.module.scss";
import stylesWidget from "@/component/StatGrid/StatGrid.module.scss";
import { TodoPage } from "./Component/TodoPage";
import { TodoHeader } from "./Component/TodoPage/TodoHeader";
import { TodoBody } from "./Component/TodoPage/TodoBody";
import { StatGrid } from "@/component/StatGrid";
import { StatWidget } from "@/component/StatGrid/StatWidget";
import { TaskForm } from "../HomePage/Component/TaskForm";
import { SegmentedControl } from "@/component/SegmentedControl/SegmentedControl";
import { Panel } from "@/component/Panel/Panel";
import { TaskList } from "./Component/TaskList/TaskList";
import { TaskItem } from './Component/TaskList/TaskItem';
import { Task } from "@/models/Task";
import { TaskStatus } from "./constant";
import iconListClipboard from '@/assets/images/icon-list-clipboard.svg';
import iconListLayout from '@/assets/images/icon-list-layout.svg';
import iconSquareCheck from '@/assets/images/icon-square-check.svg'


const TASK_STATUS_NAME = {
  [TaskStatus.ALL]: "All",
  [TaskStatus.ACTIVE]: "Active",
  [TaskStatus.DONE]: "Done",
}

const statuses = [
  TASK_STATUS_NAME[TaskStatus.ALL],
  TASK_STATUS_NAME[TaskStatus.ACTIVE],
  TASK_STATUS_NAME[TaskStatus.DONE],
]
export class Todolist extends React.Component {
  
  state = { 
    tasks: [], 
    selectedStatus: TaskStatus.ALL, 
    inputValue: "",
    isDisabled: false
  }

/**
 * 
 * @param {string} value 
 * @returns 
 */
  handleOnChange = (value) => {
    this.setState({ inputValue: value })
  }

  handleAdd = () => {
    if (!this.state.inputValue.trim()) return;
    const id = String(Date.now());
    const task = new Task( id, this.state.inputValue, this.state.isCompleted )

    this.setState({ 
      tasks: this.state.tasks.concat(task),
      selectedStatus: TaskStatus.ALL,
      inputValue: "",
    });
  }
  
  handleOnSelectSegment = (index) => {
      const statusMapping = [TaskStatus.ALL, TaskStatus.ACTIVE, TaskStatus.DONE];
      this.setState({ selectedStatus: statusMapping[index] })
  }

  handleOnChangeCheckbox = (id) => {
    this.setState((prev) => ({
      tasks: prev.tasks.map((task) => 
        task.id === id ? 
        { ...task, isCompleted: !task.isCompleted } :
        task
        )}
      )
    )
  }

  handleOnChangeLabel = ( id, newLabel) => {
    this.setState((prev) => ({ 
      tasks: prev.tasks.map((task) => 
      task.id === id ?
      { ...task, name: newLabel } :
      task
      )
    }));
  }

  handleOnEditing = (id) => {
    this.setState((prev) => ({
      isDisabled: !prev.isDisabled,
      tasks: prev.tasks.map((task)=>
      task.id === id ?
      { ...task, isEditing: !task.isEditing } :
      task
      )
    }))
  }

  handleOnDelete = (id) => {
    this.setState((prev) => ({
      tasks: prev.tasks.filter((task) => task.id !== id)
    }))
  }

  getStatsByStatus() {
    return {
      [TaskStatus.ALL]: this.state.tasks,
      [TaskStatus.ACTIVE]: this.state.tasks.filter((task)=> !task.isCompleted),
      [TaskStatus.DONE]: this.state.tasks.filter((task)=> task.isCompleted),
    }
  }

  render() {
    const taskByStatus = this.getStatsByStatus();
    const visibleTasks = taskByStatus[this.state.selectedStatus] || [];

    return (
      <TodoPage>
        <TodoHeader>Todolist</TodoHeader>
        <StatGrid>
          <StatWidget
            classWidget={stylesWidget.statWidgetLead}
            icon={iconListClipboard}
            alt='icon list clipboard'
            value={taskByStatus[TaskStatus.ALL].length}>
            Task
          </StatWidget>

          <StatWidget
            classWidget={stylesWidget.statWidgetInfo}
            icon={iconListLayout}
            alt='icon list clipboard'
            value={taskByStatus[TaskStatus.ACTIVE].length}>
            Active
          </StatWidget>

          <StatWidget
            classWidget={stylesWidget.statWidgetSuccess}
            icon={iconSquareCheck}
            alt='icon list clipboard'
            value={taskByStatus[TaskStatus.DONE].length}>
            Done
          </StatWidget>
        </StatGrid>
        <TaskForm
          value={this.state.inputValue}
          onChangeValue={this.handleOnChange}
          onAdd={this.handleAdd}
          isDisabled={this.state.isDisabled}  
        />
        <TodoBody>
        <Panel 
          header={
            <SegmentedControl 
              segments={statuses}
              selectedStatus={this.state.selectedStatus}
              onSelectSegment={this.handleOnSelectSegment}
              isDisabled={this.state.isDisabled}
            />
        } body={
          <TaskList>
            {visibleTasks.map((task) => (
              <TaskItem
                key={task.id} 
                id={task.id} 
                label={task.name} 
                isCompleted={task.isCompleted}
                isEditing={task.isEditing}
                isDisabled={this.state.isDisabled}
                onChangeCheckbox={() => this.handleOnChangeCheckbox(task.id)}
                onChangeLabel={(newLabel) => this.handleOnChangeLabel(task.id, newLabel)}
                onEditing={() => this.handleOnEditing(task.id)}
                onDelete={() => this.handleOnDelete(task.id)}
              />
            ))}
          </TaskList>
        } />
        </TodoBody>
      </TodoPage>
    );
  }
}
