const express = require('express');
const { catchErrors } = require('@/handlers/errorHandlers');
const router = express.Router();

const appControllers = require('@/controllers/appControllers');
const { routesList } = require('@/models/utils');

const routerApp = (entity, controller) => {
  //Adding Query Endpoints
  if(entity === 'query'){
    entity = 'queries'; // To align with specs
    router.route(`/${entity}/`).post(catchErrors(controller['create']));
    router.route(`/${entity}/:id`).put(catchErrors(controller['update'])); 
    router.route(`/${entity}/:id`).get(catchErrors(controller['read']));
    router.route(`/${entity}/`).get(catchErrors(controller['list']));
    const subEntity = "notes";
    router.route(`/${entity}/:id/${subEntity}/`).post(catchErrors(controller['createNote']));
    router.route(`/${entity}/:id/${subEntity}/noteId`).delete(catchErrors(controller['deleteNote']));
    return
  } 
  router.route(`/${entity}/create`).post(catchErrors(controller['create']));
  router.route(`/${entity}/read/:id`).get(catchErrors(controller['read']));
  router.route(`/${entity}/update/:id`).patch(catchErrors(controller['update']));
  router.route(`/${entity}/delete/:id`).delete(catchErrors(controller['delete']));
  router.route(`/${entity}/search`).get(catchErrors(controller['search']));
  router.route(`/${entity}/list`).get(catchErrors(controller['list']));
  router.route(`/${entity}/listAll`).get(catchErrors(controller['listAll']));
  router.route(`/${entity}/filter`).get(catchErrors(controller['filter']));
  router.route(`/${entity}/summary`).get(catchErrors(controller['summary']));

  if (entity === 'invoice' || entity === 'quote' || entity === 'payment') {
    router.route(`/${entity}/mail`).post(catchErrors(controller['mail']));
  }

  if (entity === 'quote') {
    router.route(`/${entity}/convert/:id`).get(catchErrors(controller['convert']));
  }
};

routesList.forEach(({ entity, controllerName }) => {
  const controller = appControllers[controllerName];
  routerApp(entity, controller);
});

module.exports = router;
