import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Feature2 from "./Feature2";

describe("Feature2 API fetch test", () => {
  test('fetches and displays vehicle types for "Suzuki"', async () => {
    // Simuler une réponse API pour "Suzuki"
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        Results: [
          { VehicleTypeName: "Motorcycle" },
          { VehicleTypeName: "Passenger Car" },
          { VehicleTypeName: "Truck" },
          { VehicleTypeName: "Multipurpose Passenger Vehicle (MPV)" },
          { VehicleTypeName: "Low Speed Vehicle (LSV)" },
        ],
      }),
    });

    render(<Feature2 />);

    const input = screen.getByPlaceholderText("Entrez une marque (ex: Mercedes)");
    const button = screen.getByText("Rechercher");

    // Entrer "Suzuki" dans l'input
    fireEvent.change(input, { target: { value: "Suzuki" } });

    // Cliquer sur le bouton "Rechercher"
    fireEvent.click(button);

    // Vérifier que le texte de chargement s'affiche
    expect(screen.getByText("Chargement...")).toBeInTheDocument();

    // Attendre que les résultats soient affichés
    await waitFor(() => {
      expect(screen.getByText('Résultats pour "Suzuki" :')).toBeInTheDocument();
      expect(screen.getByText("Motorcycle")).toBeInTheDocument();
      expect(screen.getByText("Passenger Car")).toBeInTheDocument();
      expect(screen.getByText("Truck")).toBeInTheDocument();
      expect(screen.getByText("Multipurpose Passenger Vehicle (MPV)")).toBeInTheDocument();
      expect(screen.getByText("Low Speed Vehicle (LSV)")).toBeInTheDocument();
    });
  });
});