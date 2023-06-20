import {
  renderWidgetForecast,
  renderWidgetOther,
  renderWidgetToday,
} from "./modules/render.js";
import { startWidget } from "./modules/widgetService.js";

const initWidget = (app) => {
  const widget = startWidget();

  renderWidgetToday(widget);
  renderWidgetOther(widget);
  renderWidgetForecast(widget);

  app.append(widget);
};

initWidget(document.querySelector("#app"));
