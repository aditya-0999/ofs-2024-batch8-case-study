package com.ofss.main.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table (name="account_details")
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name ="account_id")
	private int accountId;
	
	@OneToOne // Assuming each Customer has one Login
    @JoinColumn(name = "customer_id") // This assumes you have a login_id foreign key column
    private Customer customer;
	
	@Column (name ="account_type")
    private String accountType;
	
	@Column (name ="balance")
    private double balance;

    public Account() {
    }

    public Account(Customer customer, String accountType) {
        this.customer = customer;
        this.accountType = accountType;
    }
    public Account(int accountId, Customer customer, String accountType, double balance) {
        this.accountId = accountId;
        this.customer = customer;
        this.accountType = accountType;
        this.balance = balance;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "Account [accountId=" + accountId + ", customer=" + customer + ", accountType=" + accountType
                + ", balance=" + balance + "]";
    }

}