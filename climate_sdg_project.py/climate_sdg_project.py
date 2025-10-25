# =============================================
# Climate Change Impact Predictor - NO INSTALL REQUIRED
# Uses only built-in Python libraries
# =============================================

import math

def simple_linear_regression(x, y):
    """Manual linear regression without external libraries"""
    n = len(x)
    sum_x = sum(x)
    sum_y = sum(y)
    sum_xy = sum(x[i] * y[i] for i in range(n))
    sum_x2 = sum(xi * xi for xi in x)
    
    # Calculate slope (m) and intercept (b)
    m = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x * sum_x)
    b = (sum_y - m * sum_x) / n
    
    return m, b

def predict(m, b, x):
    """Predict y value for given x"""
    return m * x + b

def main():
    print("🌍 CLIMATE CHANGE IMPACT PREDICTOR")
    print("SDG 13: Climate Action - Temperature vs Crop Yield\n")
    
    # Sample data: Temperature vs Crop Yield
    temperatures = [25.1, 25.3, 25.6, 25.8, 26.1, 26.3, 26.6, 26.9, 27.1, 27.4]
    crop_yields = [100, 98, 96, 94, 92, 90, 88, 86, 84, 82]  # percentage
    
    print("📊 CLIMATE IMPACT DATASET:")
    print("Temperature:", temperatures)
    print("Crop Yield: ", crop_yields)
    print()
    
    # Train manual linear regression
    m, b = simple_linear_regression(temperatures, crop_yields)
    
    # Make predictions
    future_temps = [28.0, 28.5, 29.0, 29.5]
    predictions = [predict(m, b, temp) for temp in future_temps]
    
    print("🔮 FUTURE CLIMATE IMPACT PREDICTIONS:")
    print("=====================================")
    for i, temp in enumerate(future_temps):
        print(f"• At {temp}°C: Crop yield = {predictions[i]:.1f}%")
    print()
    
    print(f"📈 IMPACT ANALYSIS: For every 1°C increase, crop yields drop by {abs(m):.1f}%")
    print("\n✅ MODEL SUCCESSFULLY TRAINED!")
    print("💡 This demonstrates how AI can predict climate impacts on food security")
    
    # Simple text-based visualization
    print("\n📊 VISUALIZATION:")
    print("Temperature ↑ | Crop Yield ↓")
    print("-" * 30)
    for temp, yield_val in zip(temperatures + future_temps, crop_yields + predictions):
        bars = "█" * int(yield_val / 5)
        print(f"{temp:5.1f}°C     | {bars} {yield_val:4.1f}%")

# Run the program
if __name__ == "__main__":
    main()