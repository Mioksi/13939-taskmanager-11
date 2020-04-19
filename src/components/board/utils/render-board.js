import {SHOWING_TASKS} from '../../../common/consts';
import {addLoadMoreEvent} from '../load-more-button';

const renderBoard = (boardComponent, tasks, renderTask) => {
  const taskList = boardComponent.getElement().querySelector(`.board__tasks`);

  tasks.splice(0, SHOWING_TASKS).forEach((task) => renderTask(taskList, task));

  addLoadMoreEvent(boardComponent, tasks, renderTask, taskList);
};

export {renderBoard};
