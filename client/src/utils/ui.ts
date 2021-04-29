export const get = (id: string): any => document.getElementById(id) || {};

export const getFormData = (): any => {
  const inputFields = document.getElementsByTagName("input");
  let data = {};
  for (let i = 0; i < inputFields.length; i++) {
    const { id } = inputFields[i];
    const htmlItem = get(id);
    if (id && htmlItem && htmlItem !== {}) {
      data = { ...data, [id]: htmlItem.value };
    }
  }
  return data;
};

export const putFormData = (formData: any): void => {
  Object.keys(formData).forEach((id) => {
    get(id).value = formData[id];
  });
};

export const addEventListener = (
  id: string,
  event: string,
  action: Function
) => {
  const element = get(id);
  if (element) {
    element.addEventListener(event, async (elem: any) => {
      try {
        elem?.preventDefault();
        return await action();
      } catch (error) {
        console.error(error);
      }
    });
  }
};
