import tkinter as tk
from tkinter import ttk

root = tk.Tk()
root.title("Simple Tkinter Example")
root.geometry("300x150")

# Create a label
label = ttk.Label(root, text="Hello, Tkinter!")
label.pack(pady=20)

# Create a button
def button_click():
    label.config(text="Button clicked!")

button = ttk.Button(root, text="Click me!", command=button_click)
button.pack()

root.mainloop()