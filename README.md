# Texnophobe

Like the look of math in $\LaTeX$ but hate the syntax?
Want to use math in your javascript but don't want to write it out in a long and complex syntax?
Why write $\LaTeX$ when you can write a program to do it for you?

## Examples

### Quadratic Formula

The Quadratic formula can be written as:

```texnophobe
x := (-b +- _/(b^2 -4ac))/(2a)
```

Which compiles to the latex code:

```latex
x \coloneqq \frac{-b \pm \sqrt{b^{2} -4 a c}}{2 a}
```

which when rendered gives:

$$
x \coloneqq \frac{-b \pm \sqrt{b^{2} -4 a c} }{2 a}
$$
