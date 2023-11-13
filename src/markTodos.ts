import { displayCheckedTodos } from "./displayCheckedTodos";
import { getCalendarEvents } from "./getCalendarEvents";
import { addCheckedTodo, removeCheckedTodo } from "./storage";
import { CalendarEvent, Todo } from "./types";
import { checkEvent, uncheckEvent } from "./updateCalendarEvent";

export function markIncompleteOnclick(courseId: number, todo: Todo, checkButton: HTMLButtonElement, updateCalendar: boolean = false) {
  // Remove checked assignment
  removeCheckedTodo(todo.id);
  checkButton.innerHTML = 'Mark as complete';
  
  // Uncheck event on calendar if updateCalendar is true
  if (updateCalendar) {
    const calendarEvents: CalendarEvent[] = getCalendarEvents();
    
    calendarEvents.forEach((event: CalendarEvent) => {
      const { name, element } = event;
      
      // If assignment is checked
      if (name === todo.name) {
        uncheckEvent(element);
        displayCheckedTodos();
      }
    });
  }

  checkButton.onclick = () => { markCompleteOnclick(courseId, todo, checkButton, updateCalendar) };
}

export function markCompleteOnclick(courseId: number, todo: Todo, checkButton: HTMLButtonElement, updateCalendar: boolean = false) {
  // Add checked assignment
  addCheckedTodo(todo)
  checkButton.innerHTML = 'Mark as incomplete';
  
  // Check event on calendar if updateCalendar is true
  if (updateCalendar) {
    const calendarEvents: CalendarEvent[] = getCalendarEvents();
    
    calendarEvents.forEach((event: CalendarEvent) => {
      const { name, element } = event;
      
      // If assignment is checked
      if (name === todo.name) {
        checkEvent(element);
        displayCheckedTodos();
      }
    });
  }

  checkButton.onclick = () => { markIncompleteOnclick(courseId, todo, checkButton, updateCalendar) };
}