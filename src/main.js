import API from './api/api';
import Store from './api/store';
import Provider from "./api/provider.js";
import BoardComponent from "./components/board/board";
import BoardController from './controllers/board';
import MenuComponent, {MenuItem} from "./components/menu/menu";
import StatisticsComponent from './components/statistics/statistics';
import TasksModel from './models/tasks';
import FilterController from './controllers/filter';
import {AUTHORIZATION, END_POINT, STORE_NAME, DAYS_RANGE} from './common/consts';
import {render} from "./common/utils/render";

const siteMain = document.querySelector(`.main`);
const siteHeader = siteMain.querySelector(`.main__control`);

const dateTo = new Date();
const dateFrom = (() => {
  const date = new Date(dateTo);
  date.setDate(date.getDate() - DAYS_RANGE);
  return date;
})();

const init = () => {
  const api = new API(END_POINT, AUTHORIZATION);
  const store = new Store(STORE_NAME, window.localStorage);
  const apiWithProvider = new Provider(api, store);
  const tasksModel = new TasksModel();

  const boardComponent = new BoardComponent();
  const boardController = new BoardController(boardComponent, tasksModel, apiWithProvider);
  const filterController = new FilterController(siteMain, tasksModel);
  const siteMenuComponent = new MenuComponent();
  const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});

  render(siteHeader, siteMenuComponent);
  filterController.render();
  render(siteMain, boardComponent);

  render(siteMain, statisticsComponent);
  statisticsComponent.hide();

  siteMenuComponent.setOnChange((menuItem) => {
    switch (menuItem) {
      case MenuItem.NEW_TASK:
        siteMenuComponent.setActiveItem(MenuItem.TASKS);
        statisticsComponent.hide();
        boardController.show();
        boardController.createTask();
        break;
      case MenuItem.STATISTICS:
        boardController.hide();
        statisticsComponent.show();
        break;
      case MenuItem.TASKS:
        statisticsComponent.hide();
        boardController.show();
        break;
    }
  });

  apiWithProvider.getTasks()
    .then((tasks) => {
      tasksModel.setTasks(tasks);
      boardController.render();
    });

  window.addEventListener(`load`, () => {
    navigator.serviceWorker.register(`/sw.js`);
  });

  window.addEventListener(`online`, () => {
    document.title = document.title.replace(` [offline]`, ``);

    apiWithProvider.sync();
  });

  window.addEventListener(`offline`, () => {
    document.title += ` [offline]`;
  });
};

init();
