import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react";
import Feature1 from "./Feature1";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          results: [
            { id: "1", adresse: "route de Leucate plage", ville: "LEUCATE" },
            { id: "2", adresse: "LIEUDIT CAP DE FRONTAVENUE DES ROSEAUX", ville: "PORT LEUCATE" },
          ],
        }),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Feature1 Component", () => {
  test("Permet de rechercher Lecate et affiche les bonnes stations sans vérifier les prix", async () => {
    render(<Feature1 />);

    const input = screen.getByPlaceholderText("Entrez une ville");
    const button = screen.getByText("Rechercher");

    fireEvent.change(input, { target: { value: "Leucate" } });

    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:5000/feature1/Leucate");
    });

    expect(await screen.findByText("route de Leucate plage")).toBeInTheDocument();
    expect(screen.getByText("LEUCATE")).toBeInTheDocument();
    
    expect(screen.getByText("LIEUDIT CAP DE FRONTAVENUE DES ROSEAUX")).toBeInTheDocument();
    expect(screen.getByText("PORT LEUCATE")).toBeInTheDocument();
  });
});
