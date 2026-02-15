import string
import secrets


def generate_password(length=12, use_symbols=True):
    chars = string.ascii_letters + string.digits
    if use_symbols:
        chars += "!@#$%^&*()-_=+[]{};:,.?"
    return "".join(secrets.choice(chars) for _ in range(length))


def ask_int(prompt, default):
    raw = input(f"{prompt} [{default}]: ").strip()
    if not raw:
        return default
    try:
        value = int(raw)
        if value <= 0:
            raise ValueError
        return value
    except ValueError:
        print("Invalid number, using default.")
        return default


def ask_bool(prompt, default=True):
    default_text = "Y/n" if default else "y/N"
    raw = input(f"{prompt} ({default_text}): ").strip().lower()
    if not raw:
        return default
    return raw in {"y", "yes"}


def main():
    print("=== Random Password Generator ===")
    length = ask_int("Password length", 14)
    count = ask_int("How many passwords", 3)
    use_symbols = ask_bool("Include symbols", True)

    print("\nGenerated passwords:")
    for i in range(1, count + 1):
        print(f"{i}. {generate_password(length, use_symbols)}")


if __name__ == "__main__":
    main()
