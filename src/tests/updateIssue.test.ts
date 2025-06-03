

import { axiosInstance, updateIssue } from "../shared/api";
import apiUrls from "../shared/api/apiUrls";


jest.mock("../shared/api/axiosInstance", () => {
  return {
    __esModule: true,
    default: {
      put: jest.fn(),
    },
  };
});

describe("updateIssue(taskId, payloadUpdate)", () => {
  const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("должен вызвать axiosInstance.put с правильным URL и телом, вернуть сообщение об успехе", async () => {
    const taskId = 1;
    const payloadUpdate = {
      assigneeId: 2,
      description: "Создание теста",
      priority: "Medium",
      status: "Done",
      title: "Создать тест",
    };
    const updateResponsePayload = {
      data: {
        message: "Задача обновлена",
      },
    };

    mockedAxios.put.mockResolvedValueOnce({ data: updateResponsePayload });

    const result = await updateIssue(taskId, payloadUpdate);

    expect(mockedAxios.put).toHaveBeenCalledTimes(1);
    expect(mockedAxios.put).toHaveBeenCalledWith(
      apiUrls.issues.updateIssue(taskId),
      payloadUpdate
    );
    expect(result).toEqual(updateResponsePayload);
  });

  it("должен пробросить ошибку, если axiosInstance.put выбрасывает исключение", async () => {
    const taskId = 1;
    const payloadUpdate = {
      assigneeId: 1,
      description: "Создание теста",
      priority: "Medium",
      status: "Done",
      title: "Создать тест",
    };
    const fakeError = new Error("Update failed");
    mockedAxios.put.mockRejectedValueOnce(fakeError);

    await expect(updateIssue(taskId, payloadUpdate)).rejects.toThrow("Update failed");
    expect(mockedAxios.put).toHaveBeenCalledWith(
      apiUrls.issues.updateIssue(taskId),
      payloadUpdate
    );
  });
});
