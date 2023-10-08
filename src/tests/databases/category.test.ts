import { describe, it, expect } from "@jest/globals";
import { Category } from "../../database";

describe("Category repository", () => {
  it("should add new category", async () => {
    const category = await Category.create({
      name: "testing",
      description: "test category",
      user_id: "1",
    });

    const categories = await Category.get("1", { search: "testing" });
    expect(category).toBeDefined();
    expect(category).not.toBeNull();
    expect(categories).toBeDefined();
    expect(categories).not.toBeNull();
    expect(categories).not.toHaveLength(0);
    expect(categories).toHaveLength(1);

    await Category.delete(category.id);
  });

  it("should get categories", async () => {
    const categories = await Category.get("1");

    expect(categories).toBeDefined();
    expect(categories).not.toBeNull();
    expect(categories).not.toHaveLength(0);
    expect(categories.length).toBeLessThanOrEqual(10);
  });

  it("should get categories with particular description or name", async () => {
    const categories = await Category.get("1", { search: "makanan" });
    const categories2 = await Category.get("1", { search: "nothing" });

    expect(categories).toBeDefined();
    expect(categories).not.toBeNull();
    expect(categories).not.toHaveLength(0);
    expect(categories).toHaveLength(1);

    expect(categories2).toBeDefined();
    expect(categories2).not.toBeNull();
    expect(categories2).toHaveLength(0);
  });

  it("should update a category", async () => {
    const categories = await Category.get("1", { search: "makanan" });
    const result = await Category.update(categories[0].id, {
      name: "Makanan",
      description: "kategori untuk test",
      user_id: "1",
    });

    const category = await Category.get("1", { search: "makanan" });

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(category[0]).toBeDefined();
    expect(category[0]).not.toBeNull();
    expect(category[0]).toHaveProperty("name");
    expect(category[0]).toHaveProperty("description");
    expect(category[0].name).toBe("Makanan");
    expect(category[0].description).toBe("kategori untuk test");
  });
});
