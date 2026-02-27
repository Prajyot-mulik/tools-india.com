#!/usr/bin/env python3
"""Test CGPA calculator specifically"""

from api.index import calculate_cgpa

print("=" * 50)
print("CGPA CALCULATOR TEST")
print("=" * 50)

tests = [
    (8.5, 'default', "Default formula (×9.5)"),
    (8.5, 'VTU', "VTU (×10)"),
    (8.5, 'Anna', "Anna University"),
    (9.0, 'default', "High CGPA"),
    (5.0, 'VTU', "Lower CGPA"),
]

print("\nTesting CGPA conversions:\n")
for cgpa, uni, desc in tests:
    try:
        result = calculate_cgpa(cgpa, uni)
        print(f"✅ {desc:30} → {result['percentage']}%")
    except Exception as e:
        print(f"❌ {desc:30} → ERROR: {str(e)}")

print("\n" + "=" * 50)
print("All CGPA tests completed!")
print("=" * 50)
