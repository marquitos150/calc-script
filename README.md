# Dark Calculator
Welcome to the Dark Side! The Dark Calculator is an online calculator coded using HTML, CSS, and JavaScript to handle basic arithemtic operations and memory management.

<img width="369" height="595" alt="Image" src="https://github.com/user-attachments/assets/600cd62a-45e1-4401-bed3-d866dec40e43" />

## How To Use
This section presents everything you need to know about how to use the Dark Calculator. While it is already intuitive to use an online calculator without looking over the instructions, there are important considerations and constraints to keep in mind. 

> [!NOTE]
> The calculator offers support for both on-screen control and keyboard input, which function in much the same way. Because of this, the following discussion will refer to the UI buttons only, except in cases where keyboard input is not supported. All of the supported keys are listed in the [Supported Keys for Keyboard Control](#supported-keys-for-keyboard-control) section.

### Working with Numbers and Operations
Numbers `0-9` can be added to the display by using the numerical buttons. They can also be removed in two such ways: one is by using the `CE` button, which clears the display and previous operations performed, and the other is by using the `<-` button, which removes the most recent element inputted to display.

> [!NOTE]
> The limit for the number of digits that can be inputted to the display is 14 (or 13 if a decimal point is inputted), though there can be more than 14 symbols displayed in the calculator after performing the operations. Nevertheless, the results are truncated/rounded to ensure that they are contained within the display box.

There are 4 operator buttons which handle the basic arithmetic operations: `+`, `-`, `*`, and `/`. If one of these operator buttons is clicked, the first number on the display is stored for the chosen operation, allowing the user to enter the next number. If another operator button is clicked, the initial pair of numbers will be evaluated and displayed, and the calculator then becomes ready for the next input, which will be applied to that result. This process continues until the user clicks the `=` operator, which displays the final result after the last arithmetic operation. From that point, clicking on a new digit would clear the result and start a new calculation.

> [!NOTE]
> If consecutive operator buttons are pressed, then the calculator will only take the last operator entered to be used for the next operation.

> [!WARNING]
> - Dividing a number by 0 using the `/` operator will result in a `DIVISION BY ZERO` error, and the display will show `NaN`.
> - If the result of the operations is greater than 99999999999999, then an `Overflow` error will be displayed. Vice versa, if the result of the operations is less than -99999999999999, then an `Underflow` error will be displayed.
> - Once an error is caught, the user cannot interact with the calculator until the `CE` button is clicked.

#### Decimals and Sign Change
Two other buttons that can be used on numbers are the `.` and `+/-` buttons. The user can add at most 1 `.` to the display to represent the number as a decimal. Additionally, the user can change the sign of the number by clicking the `+/-` button.

> [!NOTE]
> There is currently no keyboard key supported for the `+/-` button.

### Handling Memory
Using the memory buttons (`M+`, `M-`, and `MRC`) can be confusing if you're unfamiliar to what they do. Essentially, there is a value that is stored in the calculator's memory which keeps track of a running total for a complex calculation. The `M+` button adds the displayed number to the memory value, the `M-` button subtracts the displayed number from the memory value, and the `MRC` recalls and displays the stored memory value, with a double-press clearing the memory to 0.

> [!NOTE]
> There are currently no keyboard keys supported for the memory buttons.

### Supported Keys for Keyboard Control
- Numbers `0-9`
- `Escape` for `CE`
- Decimal Point `.`
- Arithmetic Operators (`+`, `-`, `*`, `/`)
- Evaluation Operator (`=`, `Enter`)
- `Backspace` for `<-`

## Final Notes
Further improvements can be done in order to expand the Dark Calculator's functionality. For instance, it could include additional operator buttons such as `√` (square root) and `%` (modulus) to handle a wider range of mathematical tasks. The calculator would have to be adjusted to accommodate for such buttons. Moreover, there could be an additional function which handles scientific notation, which would allow the calculator to display much larger or more precise numbers rather than those that were truncated or limited to approximately 14 digits.

Overall, this project was certainly challenging not because of the functions themselves, but in handling edge cases and ensuring the calculator behaves correctly under all possible inputs. It reinforced my web development skills while also providing me with valuable experience in careful logic design and debugging.
