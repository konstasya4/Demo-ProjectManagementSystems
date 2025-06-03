import { axiosInstance, getAllBoards } from "../shared/api";
import apiUrls from "../shared/api/apiUrls";

jest.mock("../shared/api/axiosInstance", () => {
  return {
    __esModule: true,
    default: {
      get: jest.fn(),
    },
  };
});

describe("getAllBoards", () => {
  const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("должен вернуть массив досок в нужном формате", async () => {
    const boardsPayload = {
      data: [
        {
          id: 1,
          name: "Редизайн карточки товара",
          description: "Обновление UI/UX основных страниц",
          taskCount: 13,
        },
        {
          id: 2,
          name: "Оптимизация производительности",
          description: "Улучшение Core Web Vitals",
          taskCount: 8,
        },
        {
          id: 3,
          name: "Рефакторинг API",
          description: "Оптимизация серверных методов",
          taskCount: 5,
        },
        {
          id: 4,
          name: "Миграция на новую БД",
          description: "Перенос данных на PostgreSQL 15",
          taskCount: 6,
        },
        {
          id: 5,
          name: "Автоматизация тестирования",
          description: "Написание E2E тестов",
          taskCount: 7,
        },
        {
          id: 6,
          name: "Переход на Kubernetes",
          description: "Миграция инфраструктуры",
          taskCount: 10,
        },
      ],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: boardsPayload });

    const result = await getAllBoards();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(apiUrls.boards.allBoards());

    expect(result).toEqual(boardsPayload);
  });

  it("должен пробросить ошибку, если axiosInstance.get упал", async () => {
    const fakeError = new Error("Server is not reachable");
    mockedAxios.get.mockRejectedValueOnce(fakeError);

    await expect(getAllBoards()).rejects.toThrow("Server is not reachable");
    expect(mockedAxios.get).toHaveBeenCalledWith(apiUrls.boards.allBoards());
  });
});
