import {TASK_COUNT} from "./common/consts";
import {render} from "./common/utils/render";
import {generateTasks} from "./mock/tasks";
import MenuComponent from "./components/menu/menu";
import BoardComponent from "./components/board/board";
import BoardController from './controllers/board';
import FilterController from './controllers/filter';
import TasksModel from './models/tasks';

const siteMain = document.querySelector(`.main`);
const siteHeader = siteMain.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);

const init = () => {
  const tasksModel = new TasksModel();

  tasksModel.setTasks(tasks);

  const boardComponent = new BoardComponent(tasks);
  const boardController = new BoardController(boardComponent, tasksModel);
  const filterController = new FilterController(siteMain, tasksModel);

  render(siteHeader, new MenuComponent());
  filterController.render();
  render(siteMain, boardComponent);
  boardController.render();
};

init();
