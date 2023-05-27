# Texnophobe

Like the look of math in $\LaTeX$ but hate the syntax?
Want to use math in your javascript but don't want to write it out in a long and complex syntax?
Why write $\LaTeX$ when you can write a program to do it for you?

## Examples

### Quadratic Formula

```texnophobe
x := (-b +- _/(b^2 -4ac))/(2a)
```

which compiles to the latex code:

```latex
x \coloneqq \frac{-b \pm \sqrt{b^{2} -4 a c}}{2 a}
```

which when rendered gives:

$$
x \coloneqq \frac{-b \pm \sqrt{b^{2} -4 a c} }{2 a}
$$

**Explanation**:

Fractions can be written in the form either `a/b`, where `a` and `b` do not contain spaces, or `(a)/(b)` where `a` and `b` can be pretty much anything.

Roots are represented as `_/(a)` = $\sqrt{a}$.
If you wanted to include a base for the root, you would write it between the slash and the opening parenthesis: `_/3(a)` = $\sqrt[3]{a}$.

### Matrices

```texnophobe
A + [1  0  0]
    [0  1  0]
    [0  0  1]
```

which compiles to the latex code:

```latex
A +
\begin{bmatrix}
  1 & 0 & 0 \\
  0 & 1 & 0 \\
  0 & 0 & 1 \\
\end{bmatrix}
```

which when rendered gives:

$$
A +
\begin{bmatrix}
  1 & 0 & 0 \\
  0 & 1 & 0 \\
  0 & 0 & 1 \\
\end{bmatrix}
$$

Note the 2 spaces between each element of the matrix.

The spaces before each line of the matrix are optional, as are the new lines. Equally valid (but harder to read) is:

```texnophobe
A + [1  0  0][0  1  0][0  0  1]
```
